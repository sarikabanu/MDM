class Admin
{

    loginAdmin(data)
    {
        this.adminInstance = {
            Id:uuid(),
            RoleId:data.role_id,
            Name:data.name,
            PhoneNumber:data.phonenumber,
            MailId:data.mail_id,
            Password:data.password,
            ProfileUrl:data.profile_url,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            Status:1,
            ApprovalStatus:0
        };
        return this.adminInstance;
    }
    
    getAdminDetailsByMailIdResponse(Userresult,mail_id, token) {
        this.userInstance = {
                id:Userresult[0].Id,
                mail_id:mail_id,
                name:Userresult[0].Name,
                phonenumber: Userresult[0].PhoneNumber,
                profile_url: Userresult[0].ProfileUrl,
                token:token
        };
        return this.userInstance;
    }

 approveByAdmin() {
  
        this.userInstance = {
        ModifiedDate:new Date()
   };
   return this.userInstance;
 }

updateAdmin(request,result,profile_url) {
   let response={},name,phonenumber,password,profileUrl

console.log('phnum'+request.phonenumber)
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
            profileUrl,
            ModifiedDate: new Date(),
        }
 }
}

exports.Admin = Admin;
