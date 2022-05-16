import React from "react";
import LayoutHome from "../layout/LayoutHome";

import { UserFiles } from "../uploadedFilesList/FilesToUpload";

export default function UploadedFiles() {
  return (
    <div>
      <LayoutHome />

      <UserFiles />
    </div>
  );
}
