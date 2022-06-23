import { LightningElement, api } from 'lwc';

export default class Screen4 extends LightningElement {
    @api
    myrecordid;

    @api type;
    @api title;
    @api description;
    @api body;
    @api newtags = [];
    @api files = [];

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        alert('No. of files uploaded : ' + uploadedFiles.length);
    }
}