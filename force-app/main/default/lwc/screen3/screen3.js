import { LightningElement,api } from 'lwc';
import updatePost from'@salesforce/apex/newPostController.updatePostBody';

export default class Screen3 extends LightningElement {

    @api body;
    @api files = [];

    @api
    myrecordid;

    handleBodyInput(event){
        this.body = event.target.value;
        const bodyEvent = new CustomEvent("getbody", {
            detail: {body: this.body}
        });

        this.dispatchEvent(bodyEvent);
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.files = [...this.files, {name: uploadedFiles.at(uploadedFiles.lenght-1).name}];

        const filesEvent = new CustomEvent("getfiles", {
            detail: {files: JSON.stringify(this.files)}
        });

        this.dispatchEvent(filesEvent);
    }

    @api async updatePost(recordId){

        await updatePost({recordId: recordId, body: this.body}).then((result) => {
            console.log('body update success');
        }).catch((err) => {
            console.log(err);
        });
    }
}