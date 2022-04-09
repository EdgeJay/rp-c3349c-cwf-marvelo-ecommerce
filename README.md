# Marvelo E-commerce Website

Docker, CloudFormation project created for RP C3349C Marvelo E-commerce Website project.

## Getting Started

Based on [Automated software delivery using Docker Compose and Amazon ECS](https://aws.amazon.com/blogs/containers/automated-software-delivery-using-docker-compose-and-amazon-ecs/)

1. Make sure infrastructure is deployed
2. 
3. 

### How to deploy infrastructure

```bash
# Navigate to the Infrastructure Directory
$ cd ../deployments/infrastructure

# Deploy the CloudFormation Template
$ aws cloudformation create-stack \
    --stack-name marvelo-infrastructure \
    --template-body file://cloudformation.yaml \
    --capabilities CAPABILITY_IAM

# If marvelo-pipeline stack already exists in CloudFormation, use this
$ aws cloudformation update-stack \
    --stack-name marvelo-infrastructure \
    --template-body file://cloudformation.yaml \
    --capabilities CAPABILITY_IAM
```

NOTE: If first time running of `aws cloudformation create-stack` command failed, it could be due to lack of Service Linked Role for ECS. Either try create stack again or create Service Linked Role for ECS via IAM.

### How to deploy pipeline

Before deploying pipeline, make sure infrastructure is deployed already as it depends on VPC, ELB and ECS cluster to be available first.

If creating pipeline for first-time or recreating it after deletion, the GitHub webhook needs to be set up before executing `aws cloudformation` command:

1. Generate secret
2. Create/update `token` key of `MarveloGitHubSecret` stored in Secrets Manager with secret value generated in step 1.
3. Execute `aws cloudformation` command
4. Get webhook url using `aws codepipeline list-webhooks` command and update GitHub repository Webhook settings.

```bash
# Navigate to the Infrastructure Directory
$ cd ../deployments/pipeline

# Deploy the CloudFormation Template
$ aws cloudformation create-stack \
    --stack-name marvelo-pipeline \
    --template-body file://cloudformation.yaml \
    --capabilities CAPABILITY_IAM

# If marvelo-pipeline stack already exists in CloudFormation, use this
$ aws cloudformation update-stack \
    --stack-name marvelo-pipeline \
    --template-body file://cloudformation.yaml \
    --capabilities CAPABILITY_IAM
```

## Useful Tools

### Generate random bytes using openssl command in Linux

`openssl rand -hex 20`

### CloudFormation Linter


## Notes

### Deleting CloudFormation stacks

If CloudFormation stacks use the following resources, they must be emptied first before deleting:

- S3
- ECR
