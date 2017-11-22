class Role
{
    static utcDate() {
        return (new Date()).toUTCString();
    };

    insertRole(data)
    {
        this.roleInstance = {
            Id:data.Id,
            Type:data.type,
            Status:1
        };
        return this.roleInstance;
    }
}

exports.Role= Role;