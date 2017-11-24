class PolicyApp
{

   insertPolicyApp(user_id,data)
    {
        this.policyAppInstance = {
            Id:uuid(),
            AppId:data.app_id,
            PolicyId:data.policy_id,
            Duration:data.duration,
            Description:data.description,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            CreatedBy:user_id,
            ModifiedBy:user_id,
            Status:1
        };
        return this.policyAppInstance;
    }

getPolicyAppByIdResponse(result)
    {
        this.policyAppInstance = {
            AppId:result[0].AppId,
            PolicyId:result[0].PolicyId,
            Duration:result[0].Duration,
            Description:result[0].Description,
            CreatedDate: result[0].CreatedDate,
            ModifiedDate:result[0].ModifiedDate,
            CreatedBy:result[0].CreatedBy,
            ModifiedBy:result[0].ModifiedBy,
            Status:result[0].Status
        };
        return this.policyAppInstance;
    }

upadtePolicyApp(request,result) {
  let response={},app_id,policy_id,duration,description

     if(request.app_id!=null||request.app_id!=""||request.app_id!=undefined)
        {
            app_id=request.app_id;
        }
        else{
            app_id=result[0].AppId;
        }
    if(request.policy_id!=null||request.policy_id!=""||request.policy_id!=undefined)
        {
            policy_id=request.policy_id;
        }
        else{
            policy_id=result[0].PolicyId;
        }
     if(request.duration!=null||request.duration!=""||request.duration!=undefined)
        {
            duration=request.duration;
        }
        else{
            duration=result[0].Duration;
        }
    if(request.description!=null||request.description!=""||request.description!=undefined)
        {
          description=request.description;
        }
        else{
         description=result[0].Description;
        }
        return response = {
            app_id,
            policy_id,
            duration,
            description,
            ModifiedDate: new Date(),
        }
    }
 }

exports.PolicyApp = PolicyApp;
