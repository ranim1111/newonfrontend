import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"

export const getUserSimpleFiles= async () =>{
    try {
        const response =   await axios({
            method: "get",
            url :"/uploads/files/getall/62710b99b4a11503f7f3793d",
        })
        return ({success : true,
            data : response.data,
        
        } )

    } catch (error) {
        console.log(error)
      return  ({success : false ,
        data : error.response.data})
    }




}


export const uploadSingleFiles=async (formData)=>{
    try {
        console.log(axios.defaults.headers)
        const response = await axios({
            url:'/uploads',
            method:'POST',
            data : formData
    
            
          })
          return ({success : true,
            data : response.data,
        
        } )

    } catch (error) {
        
       
            console.log(error)
           return ({success : false ,
            data : error.response.data})
        
    }
  
}

export const joinProcess = async (fileId1,fileId2,attribut1,attribut2)=>{
    try {
        const response = await axios ({
            method : 'post',
            url : '/uploads/join/files',
            data : {
    
                "attribut1" : attribut1,
                "attribut2" : attribut2,
                "fileName1" : fileId1,
                "fileName2" : fileId2
            }
            
            })
            return ({success : true,
                data : response.data,
            
            } )
    } catch (error) {
        console.log(error)
      return  ({success : false ,
        data : error.response.data})
        
    }
}

 export const deleteSignleFiles = async (id,userId)=>{
  try {
    const response = await axios ({
        method:"delete",
        url:`/uploads/files/delete/${id}/${userId}`,
      
          
    
    
      })
      return ({success : true,
        data : response.data,
    
    } )
  } catch (error) {
  return  ({success : false ,
        data : error.response.data})
      
  }
   }

   export const getSimpleFileById = async (id)=>{
       try {
        const response = await axios({
            method: "get",
            url : `/uploads/filesbyid/${id}`
          
          
          })
          return ({success : true,
            data : response.data,
        
        } )
       } catch (error) {
        return  ({success : false ,
            data : error.response.data})
           
       }
   
   }

   export const downloadFiles = async (id)=>{

    try {
        const response = await axios({
            method: "get",
            url : `/uploads/download/file/${id}`
          
          
          })
          return ({success : true,
            data : response.data,
        
        } )
       } catch (error) {
        return  ({success : false ,
            data : error.response.data})
           
       }}
   
  export const uploadJoinFiles = async (file1,file2,attribut1,attribut2,formData)=>{

try {
    const response = await  axios({
        url:'/uploads/join/add/6271101075cc6139b3b8df04',
          method:'POST',
          data : {formData,attribut1,attribut2,fileName1:file1,fileName2:file2}
      })
      return ({success : true,
        data : response.data,
    
    } )
   
} catch (error) {
    console.log(error)
    return  ({success : false ,
        data : error.response.data})
    
}
    
  }

  
  export const getJoinedFileById = async (id)=>{
    try {
     const response = await axios({
         method: "get",
         url : `http://localhost:8080/uploads/file/join/allbyid/${id}`
       
       
       })
       return ({success : true,
         data : response.data,
     
     } )
    } catch (error) {
     return  ({success : false ,
         data : error.response.data})
        
    }

}

export const deleteJoinedFiles = async (id,userId)=>{
    try {
      const response = await axios ({
          method:"delete",
          url:`/uploads/join/file/delete/${id}/${userId}`,
        
            
      
      
        })
        return ({success : true,
          data : response.data,
      
      } )
    } catch (error) {
    return  ({success : false ,
          data : error.response.data})
        
    }
     }
     export const getUserJoinedFiles= async () =>{
        try {
            const response =   await axios({
                method: "get",
                url :"uploads/files/joined/getall/6271101075cc6139b3b8df04",
            })
            return ({success : true,
                data : response.data,
            
            } )
    
        } catch (error) {
            console.log(error)
           return ({success : false ,
            data : error.response.data})
        }
    
    
    
    
    }
    
    