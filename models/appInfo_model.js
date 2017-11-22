class AppInfo
{

   insertAppInfo(user_id,data,icon_url)
    {
        this.appInfoInstance = {
            Id:uuid(),
            Name:data.name,
            Icon:icon_url,
            Description:data.description,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            CreatedBy:user_id,
            ModifiedBy:user_id,
            Status:1
        };
        return this.appInfoInstance;
    }

 getAppInfoByIdResponse(result)
    {
        this.appInfoInstance = {
            Name:result[0].Name,
            Icon:result[0].Icon,
            Description:result[0].Description,
            CreatedDate: result[0].CreatedDate,
            ModifiedDate:result[0].ModifiedDate,
            CreatedBy:result[0].CreatedBy,
            ModifiedBy:result[0].ModifiedBy,
            Status:result[0].Status
        };
        return this.appInfoInstance;
    }

upadteAppInfo(request,result,icon_url) {
  let response={},name,duration

     if(request.name!=null||request.name!=""||request.name!=undefined)
        {
            name=request.name;
        }
        else{
            name=result[0].name;
        }
     if(request.description!=null||request.description!=""||request.description!=undefined)
        {
          description=request.description;
        }
        else{
         description=result[0].Description;
        }
     if(icon_url!=null||icon_url!=""||icon_url!=undefined)
        {
            iconUrl=icon_url;
        }
        else{
            iconUrl=result[0].Icon;
        }
        return response = {
            name,
            description,
            iconUrl,
            ModifiedDate: new Date(),
        }
   }
}

exports.AppInfo = AppInfo;