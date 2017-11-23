class User
{

    loginUser(data,profile_url)
    {
        this.userInstance = {
            Id:uuid(),
            RoleId:data.role_id,
            Name:data.name,
            PhoneNumber:data.phonenumber,
            MailId:data.mail_id,
            Password:data.password,
            DeviceId:data.device_id,
            ProfileUrl:profile_url,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            Status:1,
            ApprovalStatus:0,
            FcmToken:data.fcm_token
        };
        return this.userInstance;
    }
         
 userResponse(result, token) {
        this.userInstance = {
            Id: result[0].Id,
//          RoleId:result[0].RoleId,
            Name: result[0].Name,
            PhoneNumber: result[0].PhoneNumber,
            MailId: result[0].MailId,
            Password: result[0].Password,
            DeviceId:result[0].DeviceId,
            ProfileUrl: result[0].ProfileUrl,
            ApprovalStatus: result[0].ApprovalStatus,
            FcmToken: result[0].FcmToken,
            token: token
           };
        return this.userInstance;
    }
     getUserDetailsByIdResponse(result) {
        this.userInstance = {
            Id: result[0].Id,
            Name: result[0].Name,
            PhoneNumber: result[0].PhoneNumber,
            MailId: result[0].MailId,
            Password: result[0].Password,
            DeviceId:result[0].DeviceId,
            ProfileUrl: result[0].ProfileUrl,
            ApprovalStatus: result[0].ApprovalStatus,
            FcmToken:result[0].FcmToken
          };
        return this.userInstance;
    }
updateUser(request,result,profile_url) {
   let response={},name,phonenumber,password,fcm_token,profileUrl,device_id

     if(request.name!=null||request.name!=""||request.name!=undefined)
        {
            name=request.name;
        }
        else{
            name=result[0].Name;
        }
     if(request.phonenumber!=null||request.phonenumber!=""||request.phonenumber!=undefined)
        {
        phonenumber=request.phonenumber;
        }
        else{
            phonenumber=result[0].PhoneNumber;
        }
    if(request.password!=null||request.password!=""||request.password!=undefined)
        {
            password=request.password;
        }
        else{
            password=result[0].Password;
        }
    if(request.device_id!=null||request.device_id!=""||request.device_id!=undefined)
        {
            device_id=request.device_id;
        }
        else{
            device_id=result[0].DeviceId;
        }
    if(request.fcm_token!=null||request.fcm_token!=""||request.fcm_token!=undefined)
        {
            fcm_token=request.fcm_token;
        }
        else{
            fcm_token=result[0].FcmToken;
        }
     if(profile_url!=null||profile_url!=""||profile_url!=undefined)
        {
            profileUrl=profile_url;
        }
        else{
            profileUrl=result[0].ProfileUrl;
        }
        return response = {
            name,
            phonenumber,
            password,
            device_id,
            fcm_token,
            profileUrl,
            ModifiedDate: new Date(),
        }
 }
 userUpdateResponse(result) {
        this.userInstance = {
            Id: result[0].Id,
            Name: result[0].Name,
            PhoneNumber: result[0].PhoneNumber,
            MailId: result[0].MailId,
            Password: result[0].Password,
            DeviceId:result[0].DeviceId,
            ProfileUrl: result[0].ProfileUrl,
            Status:result[0].Status,
            ApprovalStatus: result[0].ApprovalStatus,
            FcmToken:result[0].FcmToken
        };
        return this.userInstance;
    }
}

exports.User = User;
