import cognito = require('@aws-cdk/aws-cognito');
import acm = require('@aws-cdk/aws-certificatemanager');
import route53 = require('@aws-cdk/aws-route53');
import s3 = require('@aws-cdk/aws-s3');
import cdn = require('@aws-cdk/aws-cloudfront');
import cdk = require('@aws-cdk/core');

const APP_DOMAIN = "travelin.pro";

export class EverywhereStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'AppUserLogins', {
      signInType: cognito.SignInType.USERNAME
    });

    const hostedZone = route53.HostedZone.fromLookup(this, 'AppHostedZone', {
      domainName: APP_DOMAIN
    });

    const validatedCert = new acm.DnsValidatedCertificate(this, 'AppValidatedCertificate', {
      hostedZone,
      domainName: `*.${APP_DOMAIN}`,
      region: 'us-east-1',
      validationMethod: acm.ValidationMethod.DNS
    });

    const siteBucket = new s3.Bucket(this, 'AppSiteBucket');
    const distribution = new cdn.CloudFrontWebDistribution(this, 'AppCDN', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket
          },
          behaviors:[
            {
              isDefaultBehavior: true
            }
          ]
        }
      ]
    });
  }
}
