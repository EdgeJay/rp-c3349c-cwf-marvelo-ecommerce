'use strict';

const fs = require("fs");
const path = require("path");

const {
  categories,
  products
} = require("../../data/data");

const findPublicRole = async () => {
  const result = await strapi
    .query("role", "users-permissions")
    .findOne({
      type: "public"
    });
  return result;
};

const setDefaultPermissions = async () => {
  const role = await findPublicRole();
  const permissions_applications = await strapi
    .query("permission", "users-permissions")
    .find({
      type: "application",
      role: role.id
    });
  await Promise.all(
    permissions_applications.map(p =>
      strapi
      .query("permission", "users-permissions")
      .update({
        id: p.id
      }, {
        enabled: true
      })
    )
  );
};

const isFirstRun = async () => {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "type",
    name: "setup"
  });
  const initHasRun = await pluginStore.get({
    key: "initHasRun"
  });
  await pluginStore.set({
    key: "initHasRun",
    value: true
  });
  return !initHasRun;
};

const getFilesizeInBytes = filepath => {
  var stats = fs.statSync(filepath);
  var fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
};

const createSeedData = async (files) => {

  const handleFiles = (data) => {

    var file = files.find(x => x.includes(data.slug));
    file = `./data/uploads/${file}`;

    const size = getFilesizeInBytes(file);
    const array = file.split(".");
    const ext = array[array.length - 1]
    const mimeType = `image/.${ext}`;
    const image = {
      path: file,
      name: `${data.slug}.${ext}`,
      size,
      type: mimeType
    };
    return image
  }


  const categoriesPromises = categories.map(({
    ...rest
  }) => {
    return strapi.services.category.create({
      ...rest
    });
  });


  const productsPromises = products.map(async product => {
    const image = handleFiles(product)

    const files = {
      image
    };

    try {
      const entry = await strapi.query('product').create(product);

      if (files) {
        await strapi.entityService.uploadFiles(entry, files, {
          model: 'product'
        });
      }
    } catch (e) {
      console.log(e);
    }

  });

  await Promise.all(categoriesPromises);
  await Promise.all(productsPromises);

  // add admin
  // copied from https://github.com/sunnysonx/strapi-plugin-bootstrap-admin-user/blob/main/config/functions/bootstrap.js
  const addSuperAdmin = async () => {
    if (process.env.NODE_ENV === 'development' || process.env.DEV_ADMIN_ALLOW == 'true') {
      const params = {
        username: process.env.DEV_ADMIN_USERNAME || 'admin',
        password: process.env.DEV_ADMIN_PASSWORD || 'admin',
        firstname: process.env.DEV_ADMIN_FIRSTNAME || 'Admin',
        lastname: process.env.DEV_ADMIN_LASTNAME || 'Admin',
        email: process.env.DEV_ADMIN_EMAIL || 'admin@strapi.dev',
        blocked: false,
        isActive: true,
      };
      
      //Check if any account exists.
      try {
        const admins = await strapi.query('user', 'admin').find();
        if (admins.length === 0) {
          let tempPass = params.password;
          let verifyRole = await strapi.query('role', 'admin').findOne({
            code: 'strapi-super-admin',
          });
          if (!verifyRole) {
            verifyRole = await strapi.query('role', 'admin').create({
              name: 'Super Admin',
              code: 'strapi-super-admin',
              description: 'Super Admins can access and manage all features and settings.',
            });
          }
          params.roles = [verifyRole.id];
          params.password = await strapi.admin.services.auth.hashPassword(params.password);
          await strapi.query('user', 'admin').create({
            ...params,
          });
          strapi.log.info('Admin account was successfully created.');
          strapi.log.info(`Email: ${params.email}`);
          strapi.log.info(`Password: ${tempPass}`);
        }
      } catch (error) {
        strapi.log.error(`Couldn't create Admin account during bootstrap: `, error);
      }
    }
  };

  await addSuperAdmin();
};

module.exports = async () => {
  const shouldSetDefaultPermissions = await isFirstRun();
  if (shouldSetDefaultPermissions) {
    try {
      console.log("Setting up your starter...");
      const files = fs.readdirSync(`./data/uploads`);
      await setDefaultPermissions();
      await createSeedData(files);
      console.log("Ready to go");
    } catch (e) {
      console.log(e);
    }
  }
};
