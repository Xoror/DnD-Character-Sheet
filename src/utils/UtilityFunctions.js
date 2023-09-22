const downloadFile = ({ data, fileName, fileType }) => {
	// Create a blob with the data we want to download as a file
	const blob = new Blob([data], { type: fileType })
	// Create an anchor element and dispatch a click event on it
	// to trigger a download
	const a = document.createElement('a')
	a.download = fileName
	a.href = window.URL.createObjectURL(blob)
	const clickEvt = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true,
	})
	a.dispatchEvent(clickEvt)
	a.remove()
}

export const exportToJson = (event, charName, currentState) => {
	event.preventDefault()
	let test = ""
	if(charName === "") {
		test = "character"
	}
	else {
		let test1 = charName.split(" ")
		test1.map(word => (
			test += word
		))
	}
	downloadFile({
		data: JSON.stringify(currentState, null, "\t"),
		fileName: test +'.json',
		fileType: 'text/json',
	})
}

export const readFileOnUpload = (uploadedFile, onUploadFunction) => {
   const fileReader = new FileReader();
   fileReader.onloadend = () => {
	  try {
		//dispatch(importState(JSON.parse(fileReader.result), dispatch))
		onUploadFunction(fileReader.result)
		} catch(e) {
			console.log("**Not valid JSON file!**");
		}
	}
	if( uploadedFile!== undefined) {
	  fileReader.readAsText(uploadedFile);
	}
}