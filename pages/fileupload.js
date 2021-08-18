import React from 'react';
import axios from 'axios';
export default class fileupload extends React.Component {
	state = {
		selectedFile:'',
		file_error:'',
		success:'',
		loading_percentage:'',
	}
	 onFileChange = event => {
		this.setState({file_error:''});
		console.log( event.target.files[0]);
		this.setState({ selectedFile: event.target.files[0] });
    
    };
	
	onFileUpload = () => {
		this.setState({file_error:''});
		if(typeof this.state.selectedFile!==undefined && this.state.selectedFile!=null && this.state.selectedFile!=''){
		var that = this;
		this.setState({show_loading:'1'})
      // Create an object of formData
      const formData = new FormData();
      // Update the formData object
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
	   var config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
			 that.setState({loading_percentage:percentCompleted+'%'})
            }
          };
		axios.post("http://localhost:5000/fileupload", formData,config).then(res => {
			this.setState({success:'Success file has been uploaded successfully.'})
		})
	} else {
		this.setState({file_error:'Please input a valid file.'});
	}
	}

  
	fileData = () => {
    if (this.state.selectedFile) {
    return (
		<div>
			<h2>File Details:</h2>
			<p>File Name: {this.state.selectedFile.name}</p>
			<p>File Type: {this.state.selectedFile.type}</p>
			<p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
          </div>
        );
      } else {
        return (
          <div>
            
          </div>
        );
      }
    };
	render() {
		return (
		 <>
		  <div style={{"padding":"20px"}}>
            
            <h3>
             Upload File
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
			<span style={{"color":"red"}}>{this.state.file_error}</span>
			<br/>
			<span>{this.state.loading_percentage}</span>
			<br/>
			<span style={{"color":"red"}}>{this.state.success}</span>
		
        </div>
		</>
		)
	}
}