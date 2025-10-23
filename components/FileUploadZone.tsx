import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadZoneProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  className?: string;
}

export const FileUploadZone = ({ 
  onFileSelect, 
  accept = "image/*",
  className 
}: FileUploadZoneProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
            <Upload className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="mb-2 text-sm">
            <span className="text-primary font-medium">Click to upload</span>{" "}
            <span className="text-muted-foreground">or drag and drop</span>
          </p>
          <p className="text-xs text-muted-foreground">Supports images, max 5MB per file.</p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};