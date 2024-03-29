import React, { Fragment, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { FilePicker } from "./FilePicker";

const ADD_FILE = gql`
  mutation ($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

export const AddFile: React.FC = (): JSX.Element => {
  const [addFile, { error, loading, data }] = useMutation(ADD_FILE);

  const [selectedFile, setSelectedFile] = useState(null);

  const onSelectHandler = (file: any) => {
    setSelectedFile(file);
  };

  const addFileHandler = () => {
    if (!selectedFile) return;
    console.log("file being uploaded");
    console.log(selectedFile);

    // const formData = new FormData()

    // const fileToBeUploaded = formData.append(File, file)

    addFile({ variables: { file: selectedFile } });
    console.log("data");
    console.log(data);
  };

  return (
    <Fragment>
      {loading && <p>Uploading...</p>}
      {error && <p>{error.message}</p>}
      {/* File preview here */}
      {!selectedFile && <FilePicker onSave={onSelectHandler} />}
      {selectedFile && <button onClick={addFileHandler}>Upload</button>}
    </Fragment>
  );
};

//// upload file config
// const { ApolloClient } = require('apollo-client')
// const { InMemoryCache } = require('apollo-cache-inmemory')
// const { createUploadLink } = require('apollo-upload-client')

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: createUploadLink()
// })

// // Upload single file
// import { gql, useMutation } from "@apollo/client";

// const MUTATION = gql`
//   mutation ($file: Upload!) {
//     uploadFile(file: $file) {
//       success
//     }
//   }
// `;

// function UploadFile() {
//   const [mutate] = useMutation(MUTATION);

//   function onChange({
//     target: {
//       validity,
//       files: [file],
//     },
//   }) {
//     if (validity.valid) mutate({ variables: { file } });
//   }

//   return <input type="file" required onChange={onChange} />;
// }

// // upload blob
// import { gql, useMutation } from "@apollo/client";

// const MUTATION = gql`
//   mutation ($file: Upload!) {
//     uploadFile(file: $file) {
//       success
//     }
//   }
// `;

// function UploadFile() {
//   const [mutate] = useMutation(MUTATION);

//   function onChange({ target: { validity, value } }) {
//     if (validity.valid) {
//       const file = new Blob([value], { type: "text/plain" });

//       // Optional, defaults to `blob`.
//       file.name = "text.txt";

//       mutate({ variables: { file } });
//     }
//   }

//   return <input type="text" required onChange={onChange} />;
// }
