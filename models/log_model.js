class Logs
{

   insertLogs(user_id,data)
    {
        this.logsInstance = {
            Id:uuid(),
            UserId:data.user_id,
            DeviceId:data.device_id,
            VisitedUrl:data.visited_url,
            Duration:data.duration,
            Description:data.description,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            CreatedBy:user_id,
            ModifiedBy:user_id,
            Status:1
        };
        return this.logsInstance;
    }
}

exports.Logs = Logs;
