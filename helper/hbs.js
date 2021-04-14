const moment = require("moment");
module.exports = {

    stringify: function (object){
        return JSON.stringify(object);
    },
    formatDate: function (date, format){
        return moment(date).format(format);
    }
}