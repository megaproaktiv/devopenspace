package main

import (
	"testing"
	aws "github.com/aws/aws-sdk-go-v2/aws"
	ec2 "github.com/megaproaktiv/cit/citec2"
	"github.com/stretchr/testify/assert"
)

func TestVpcPro(t *testing.T) {
  //   1. Stack, 2. ConstructID
	vpc,err := ec2.GetVpc(aws.String("vpc"), aws.String("baseVPC"))
	assert.Nil(t,err)
	assert.Equal(t, "10.0.96.0/21",*vpc.CidrBlock)
}
