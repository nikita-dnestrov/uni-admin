import { useCallback } from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { COLORS } from "../../../../lib/const";
import { useDropzone } from "react-dropzone";
import { Button } from "../../../../components/ui/button";
import { Trash2, X } from "lucide-react";
import { Label } from "../../../../components/ui/label";
import { Separator } from "../../../../components/ui/separator";

type TProps = {
  colorId: string;
  onColorRemove: (colorId: string) => void;
  imagesPreview: string[];
  onImageAdd: (images: { file: File; preview: string }[]) => void;
  colorForm?: any;
  onAddSize: (colorId: string) => void;
  onColorNameUpdate: (value: string) => void;
  onSizeValueUpdate: (sizeId: string, field: string, value: string) => void;
  onSizeRemove: (sizeId: string) => void;
  index: number;
};

export const ProductFormColor = ({
  colorId,
  index,
  imagesPreview,
  colorForm,
  onColorRemove,
  onImageAdd,
  onSizeRemove,
  onAddSize,
  onColorNameUpdate,
  onSizeValueUpdate,
}: TProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.slice(0, 3).map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Create preview URL
    }));
    onImageAdd(newImages);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "image/*": [] } });

  return (
    <div className="">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>Color {index + 1}</div>
            <X />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Select value={colorForm.color} onValueChange={onColorNameUpdate}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="" />
              <span style={{ background: "pink", width: "50px" }}></span>
            </SelectTrigger>
            <SelectContent>
              {COLORS.map((el) => {
                return (
                  <SelectItem key={el.value} value={el.value}>
                    <span>{el.label}</span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-5">
            {imagesPreview
              ? imagesPreview.map((el: any, i: number) => {
                  return (
                    <img
                      key={i}
                      className="w-[75px] h-[75px] object-cover overflow-hidden"
                      src={el.preview}
                      alt="img"
                    />
                  );
                })
              : ""}
          </div>

          <div
            className="h-[200px] border border-gray-200 rounded-md p-5 shadow-sm text-gray-400 flex justify-center items-center cursor-pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="text-center">
                <div>Click or drag image here to upload</div>
                <div>You can upload up to 3 images</div>
                <div>Non-rectangular images would be cropped automatically</div>
              </div>
            )}
          </div>

          <Button type="button" variant="outline" onClick={() => onAddSize(colorId)}>
            Add size
          </Button>

          {colorForm.sizes.map((el: any) => {
            return (
              <div key={el.id}>
                <Separator className="mb-3" />
                <div className="flex justify-between gap-5 items-center">
                  <div>
                    <Label htmlFor="size">Size </Label>
                    <Input
                      onChange={(e) => onSizeValueUpdate(el.id, "size", e.target.value)}
                      value={el.size}
                      id="size"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock </Label>
                    <Input
                      onChange={(e) => onSizeValueUpdate(el.id, "stock", e.target.value)}
                      value={el.stock}
                      id="stock"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price </Label>
                    <Input
                      onChange={(e) => onSizeValueUpdate(el.id, "price", e.target.value)}
                      value={el.price}
                      id="price"
                    />
                  </div>

                  <div>
                    <Label htmlFor="size" className="text-white select-none">
                      .
                    </Label>
                    <Button onClick={() => onSizeRemove(el.id)} variant="ghost">
                      <X />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
