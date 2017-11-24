class AppDevice
{

   insertAppDevice(data,user_id)
    {
        this.appDeviceInstance = {
            Id:uuid(),
            AppId:data.app_id,
            DeviceId:data.device_id,
            Duration:data.duration,
            // Description:data.description,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            CreatedBy:user_id,
            ModifiedBy:user_id,
            Status:data.status
        };
        return this.appDeviceInstance;
    }

      timeUsageOnApp(data,user_id)
    {
        console.log('userid'+user_id)

        this.appDeviceInstance = {
            Id:uuid(),
            AppId:data.app_id,
            DeviceId:data.device_id,
            Duration:data.duration,
            // Description:data.description,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            CreatedBy:user_id,
            ModifiedBy:user_id,
            Status:1
        };
        return this.appDeviceInstance;
    }

  getAppDeviceByIdResponse(result)
    {
        this.appInfoInstance = {
            AppId:result[0].AppId,
            DeviceId:result[0].DeviceId,
            Duration:result[0].Duration,
            // Description:result[0].Description,
            CreatedDate: result[0].CreatedDate,
            ModifiedDate:result[0].ModifiedDate,
            CreatedBy:result[0].CreatedBy,
            ModifiedBy:result[0].ModifiedBy,
            Status:result[0].Status
        };
        return this.appInfoInstance;
    }
    

upadteAppDevice(request,result) {
  let response={},app_id,device_id,duration,description

     if(request.app_id!=null||request.app_id!=""||request.app_id!=undefined)
        {
            app_id=request.app_id;
        }
        else{
            app_id=result[0].AppId;
        }
     if(request.device_id!=null||request.device_id!=""||request.device_id!=undefined)
        {
          device_id=request.device_id;
        }
        else{
         device_id=result[0].DeviceId;
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
            device_id,
            duration,
            // description,
            ModifiedDate: new Date(),
        }
   }
}

exports.AppDevice = AppDevice;
