class Policy
{

   insertPolicy(user_id,data){
            // console.log('inserting in model '+ans.data[0].name)
            //  console.log('inserting in model '+ans.data[0].description)
            //  console.log('inserting in model '+ans.data[1].model)
    
        console.log('in model of policy '+data.name)
        this.policyInstance = {
            Id:uuid(),
            Name:data.name,
            Description:data.description,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            CreatedBy:user_id,
            ModifiedBy:user_id,
            Status:1
        };
        return this.policyInstance;
    }

  getPolicyByIdResponse(result)
    {
        this.appInfoInstance = {
            Name:result[0].Name,
            Description:result[0].Description,
            CreatedDate: result[0].CreatedDate,
            ModifiedDate:result[0].ModifiedDate,
            CreatedBy:result[0].CreatedBy,
            ModifiedBy:result[0].ModifiedBy,
            Status:result[0].Status
        };
        return this.appInfoInstance;
    }

upadtePolicy(request,result) {
  let response={},name,description

     if(request.name!=null||request.name!=""||request.name!=undefined)
        {
            name=request.name;
        }
        else{
            name=result[0].Name;
        }
        if(request.description!=null||request.description!=""||request.description!=undefined)
        {
          description=request.description;
        }
        else{
         description=result[0].Description;
        }
        return response = {
            name,
            description,
            ModifiedDate: new Date(),
        }
   }
}

exports.Policy = Policy;