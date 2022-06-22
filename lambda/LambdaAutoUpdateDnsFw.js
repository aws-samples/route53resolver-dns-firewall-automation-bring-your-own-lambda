// Package
const AWS = require('aws-sdk');

// Const 
const FirewallDomainListId = process.env.domain_list_id
const region = process.env.region

// AWS Object
const route53Resolver = new AWS.Route53Resolver({ "region": region });

async function update_route53_domains(filekey, bucketname) {
  let route53Resolver_params = {
    DomainFileUrl: "s3://"+bucketname+"/" + filekey,
    FirewallDomainListId: FirewallDomainListId,
    Operation: "REPLACE"
  }
  await route53Resolver.importFirewallDomains(route53Resolver_params).promise()
  console.log("[INFO] DNS Firewall of id : " + FirewallDomainListId + " updated with file " + filekey)
}

exports.handler = async (event) => {
  let filekey = event.detail.object.key
  let bucketname = event.detail.bucket.name
  await update_route53_domains(filekey, bucketname)

};