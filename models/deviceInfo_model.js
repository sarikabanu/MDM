class DeviceInfo
{

   insertDeviceInfo(user_id,data)
    {
        this.deviceInfoInstance = {
            Id:uuid(),
            UserId:data.user_id,
            DeviceId:data.device_id,
            Lattitude:data.lattitude,
            Longitude:data.longitude,
            Description:data.description,
            CretedDate: new Date(),
            ModifiedDate: new Date(),
            CreatedBy:user_id,
            ModifiedBy:user_id,
            Status:1
        };
        return this.deviceInfoInstance;
    }
    
   getDeviceInfoByIdResponse(result)
    {
        this.deviceInfoInstance = {
            UserId:result[0].UserId,
            DeviceId:data.device_id,
            Lattitude:result[0].Lattitude,
            Longitude:result[0].Longitude,
            Description:result[0].Description,
            CretedDate: result[0].CretedDate,
            ModifiedDate:result[0].ModifiedDate,
            CreatedBy:result[0].CreatedBy,
            ModifiedBy:result[0].ModifiedBy,
            Status:result[0].Status
        };
        return this.deviceInfoInstance;
    }
    
upadteDeviceInfo(request,result) {
  let response={},user_id,lattitude,longitude,description,device_id

     if(request.user_id!=null||request.user_id!=""||request.user_id!=undefined)
        {
            user_id=request.user_id;
        }
        else{
            user_id=result[0].UserId;
        }
    if(request.device_id!=null||request.device_id!=""||request.device_id!=undefined)
        {
            device_id=request.device_id;
        }
        else{
            device_id=result[0].DeviceId;
        }
     if(request.lattitude!=null||request.lattitude!=""||request.lattitude!=undefined)
        {
          lattitude=request.lattitude;
        }
        else{
         lattitude=result[0].Lattitude;
        }
       if(request.longitude!=null||request.longitude!=""||request.longitude!=undefined)
        {
          longitude=request.longitude;
        }
        else{
         longitude=result[0].Longitude;
        }
        if(request.description!=null||request.description!=""||request.description!=undefined)
        {
          description=request.description;
        }
        else{
         description=result[0].Description;
        }
        return response = {
            user_id,
            device_id,
            lattitude,
            longitude,
            description,
            ModifiedDate: new Date(),
        }
   }
}

exports.DeviceInfo = DeviceInfo;