package com.moviesBooking.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class FileStorageService 
{
    @Autowired
    private Cloudinary cloudinary;

    public String storeFile(MultipartFile file) throws IOException
    {
        Map uploadResult = cloudinary.uploader().upload(
            file.getBytes(),
            ObjectUtils.asMap(
                "folder", "movie-booking",
                "resource_type", "image"
            )
        );
       
        return uploadResult.get("secure_url").toString();
    }

    public void deleteFile(String fileUrl) throws IOException
    {
        if (fileUrl != null && !fileUrl.isEmpty()) {
            try {
                
                String publicId = extractPublicId(fileUrl);
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            } catch (Exception e) {
               
                System.err.println("Failed to delete from Cloudinary: " + e.getMessage());
            }
        }
    }

    private String extractPublicId(String url) {
        // https://res.cloudinary.com/xxx/image/upload/v123/movie-booking/filename.jpg
        // → movie-booking/filename
        String[] parts = url.split("/upload/");
        if (parts.length > 1) {
            String path = parts[1];
            
            if (path.startsWith("v")) {
                path = path.substring(path.indexOf("/") + 1);
            }
           
            int dotIndex = path.lastIndexOf(".");
            if (dotIndex > 0) {
                path = path.substring(0, dotIndex);
            }
            return path;
        }
        return url;
    }
}