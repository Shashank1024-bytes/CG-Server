import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Code, Send, Copy, CheckCircle, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScriptHelper = () => {
  const [command, setCommand] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  const { toast } = useToast();

  const scriptTemplates = [
    {
      command: "remove S3 duplicates",
      description: "Clean up duplicate objects in S3 bucket",
      category: "Storage"
    },
    {
      command: "auto-tag EC2 with owner",
      description: "Automatically tag EC2 instances with owner information", 
      category: "Compute"
    },
    {
      command: "cleanup CloudWatch logs",
      description: "Remove old CloudWatch log streams",
      category: "Monitoring"
    }
  ];

  const generateScript = async (scriptCommand: string) => {
    setIsGenerating(true);
    setCommand(scriptCommand);
    
    // Simulate script generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const scripts = {
      "remove S3 duplicates": `import boto3
import json

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    bucket = event.get('bucket', 'your-bucket-name')
    prefix = event.get('prefix', '')
    
    try:
        # List all objects
        response = s3.list_objects_v2(Bucket=bucket, Prefix=prefix)
        
        if 'Contents' not in response:
            return {'statusCode': 200, 'body': 'No objects found'}
        
        # Group by size and last modified to find duplicates
        objects_by_key = {}
        duplicates_removed = 0
        
        for obj in response['Contents']:
            key = obj['Key']
            size = obj['Size']
            last_modified = obj['LastModified']
            
            identifier = f"{size}_{last_modified}"
            
            if identifier in objects_by_key:
                # This is a duplicate, delete it
                s3.delete_object(Bucket=bucket, Key=key)
                duplicates_removed += 1
                print(f"Deleted duplicate: {key}")
            else:
                objects_by_key[identifier] = key
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': f'Successfully removed {duplicates_removed} duplicates',
                'bucket': bucket,
                'duplicates_removed': duplicates_removed
            })
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }`,
      "auto-tag EC2 with owner": `import boto3
import json

def lambda_handler(event, context):
    ec2 = boto3.client('ec2')
    
    try:
        # Get instance information
        instance_id = event.get('instance_id')
        owner_tag = event.get('owner', 'unknown')
        
        if not instance_id:
            return {'statusCode': 400, 'body': 'Instance ID required'}
        
        # Get instance details
        response = ec2.describe_instances(InstanceIds=[instance_id])
        
        if not response['Reservations']:
            return {'statusCode': 404, 'body': 'Instance not found'}
        
        # Add owner tag
        ec2.create_tags(
            Resources=[instance_id],
            Tags=[
                {'Key': 'Owner', 'Value': owner_tag},
                {'Key': 'AutoTagged', 'Value': 'true'},
                {'Key': 'TaggedBy', 'Value': 'CloudGuardian'},
                {'Key': 'TaggedDate', 'Value': str(datetime.now().isoformat())}
            ]
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': f'Successfully tagged instance {instance_id}',
                'instance_id': instance_id,
                'owner': owner_tag
            })
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }`,
      "cleanup CloudWatch logs": `import boto3
import json
from datetime import datetime, timedelta

def lambda_handler(event, context):
    logs_client = boto3.client('logs')
    
    try:
        log_group_name = event.get('log_group', '/aws/lambda/my-function')
        retention_days = event.get('retention_days', 30)
        
        # Calculate cutoff date
        cutoff_date = datetime.now() - timedelta(days=retention_days)
        cutoff_timestamp = int(cutoff_date.timestamp() * 1000)
        
        # Get log streams
        paginator = logs_client.get_paginator('describe_log_streams')
        deleted_streams = 0
        
        for page in paginator.paginate(logGroupName=log_group_name):
            for stream in page['logStreams']:
                if stream.get('lastEventTime', 0) < cutoff_timestamp:
                    try:
                        logs_client.delete_log_stream(
                            logGroupName=log_group_name,
                            logStreamName=stream['logStreamName']
                        )
                        deleted_streams += 1
                        print(f"Deleted stream: {stream['logStreamName']}")
                    except Exception as e:
                        print(f"Failed to delete {stream['logStreamName']}: {e}")
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': f'Cleanup completed for {log_group_name}',
                'deleted_streams': deleted_streams,
                'retention_days': retention_days
            })
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }`
    };
    
    setGeneratedScript(scripts[scriptCommand as keyof typeof scripts] || "# Script not found");
    setIsGenerating(false);
    
    toast({
      title: "Script Generated",
      description: `Lambda function for "${scriptCommand}" is ready!`
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
    toast({
      title: "Copied to clipboard",
      description: "Script has been copied to your clipboard"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Wand2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Script Helper</h2>
            <p className="text-sm text-muted-foreground">Generate AWS Lambda automation scripts</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Describe your automation need (e.g., remove S3 duplicates)"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => generateScript(command)}
              disabled={!command || isGenerating}
              className="px-6"
            >
              {isGenerating ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Or try one of these templates:</p>
            <div className="flex flex-wrap gap-2">
              {scriptTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => generateScript(template.command)}
                  className="text-sm"
                >
                  <Code className="h-3 w-3 mr-2" />
                  {template.command}
                  <Badge variant="outline" className="ml-2 text-xs">
                    {template.category}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {generatedScript && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Generated Lambda Function</h3>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Script
            </Button>
          </div>
          
          <div className="relative">
            <Textarea
              value={generatedScript}
              readOnly
              className="font-mono text-sm h-96 resize-none bg-muted"
            />
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            <Button variant="success" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Deploy to Lambda
            </Button>
            <Button variant="outline" size="sm">
              Save to Library
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ScriptHelper;