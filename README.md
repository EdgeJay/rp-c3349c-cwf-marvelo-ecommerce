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
