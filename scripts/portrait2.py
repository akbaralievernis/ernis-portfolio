"""Cut out the B&W portrait (with red rim light) from a baked-in checkerboard background."""
import sys
from PIL import Image, ImageFilter
from rembg import remove, new_session

src, out = sys.argv[1], sys.argv[2]
img = Image.open(src).convert("RGB")
cut = remove(img, session=new_session("u2net_human_seg"))
a = cut.getchannel("A").point(lambda v: 0 if v < 24 else v)
a = a.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))
cut.putalpha(a)
cut = cut.crop(a.point(lambda v: 255 if v > 40 else 0).getbbox())
cut.save(out, optimize=True)
print("saved", cut.size)
