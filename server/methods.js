/* global UploadServer: false*/
/* global uploadsDB:false*/

Meteor.methods({
    uploader: function () {
        "use strict";

        UploadServer.init({
            tmpDir: process.env.PWD + "/.uploads/tmp/",
            uploadDir: process.env.PWD + "/.uploads/",
            checkCreateDirectories: true,
            maxPostSize: 2000000, // 2Mb
            maxFileSize: 1000000, // 1Mb
            getDirectory: function(fileInfo, formData){
                return formData.userID;
            },
            finished: function(fileInfo, formData){
                if(!fileInfo.error) {
                    delete fileInfo.error;
                    fileInfo.owner = formData.userID;
                    uploadsDB.insert(fileInfo);
                }
            }
        });
    }
});