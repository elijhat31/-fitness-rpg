import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Locale;
import javax.imageio.ImageIO;

/**
 * Crops the avatar sprite sheet into 72 JPG avatar files.
 *
 * Usage from the repository root:
 *   java scripts/avatar-crop-script.java
 *
 * The source image is expected to be a 12-column by 8-row sprite sheet. The
 * first 36 tiles are written to public/avatars/male, and the next 36 tiles are
 * written to public/avatars/female.
 */
class AvatarCropScript {
    private static final Path SOURCE_IMAGE = Path.of(
            "public", "avatars", "FDA71477-C75D-4CC4-93A9-A0C009B96012.png");
    private static final Path MALE_OUTPUT_DIR = Path.of("public", "avatars", "male");
    private static final Path FEMALE_OUTPUT_DIR = Path.of("public", "avatars", "female");

    private static final int COLUMNS = 12;
    private static final int SPRITESHEET_ROWS = 8;
    private static final int AVATARS_PER_GENDER = 36;
    private static final int TOTAL_AVATARS = AVATARS_PER_GENDER * 2;

    public static void main(String[] args) throws IOException {
        BufferedImage spriteSheet = ImageIO.read(SOURCE_IMAGE.toFile());
        if (spriteSheet == null) {
            throw new IOException("Unable to read source image: " + SOURCE_IMAGE);
        }

        int tileWidth = spriteSheet.getWidth() / COLUMNS;
        int tileHeight = spriteSheet.getHeight() / SPRITESHEET_ROWS;
        if (spriteSheet.getWidth() % COLUMNS != 0 || spriteSheet.getHeight() % SPRITESHEET_ROWS != 0) {
            throw new IOException(String.format(
                    Locale.ROOT,
                    "Source image dimensions %dx%d are not divisible by the %dx%d crop grid.",
                    spriteSheet.getWidth(),
                    spriteSheet.getHeight(),
                    COLUMNS,
                    SPRITESHEET_ROWS));
        }

        Files.createDirectories(MALE_OUTPUT_DIR);
        Files.createDirectories(FEMALE_OUTPUT_DIR);

        for (int index = 0; index < TOTAL_AVATARS; index++) {
            int column = index % COLUMNS;
            int row = index / COLUMNS;
            BufferedImage cropped = spriteSheet.getSubimage(
                    column * tileWidth,
                    row * tileHeight,
                    tileWidth,
                    tileHeight);

            Path outputDir = index < AVATARS_PER_GENDER ? MALE_OUTPUT_DIR : FEMALE_OUTPUT_DIR;
            int genderIndex = (index % AVATARS_PER_GENDER) + 1;
            Path outputFile = outputDir.resolve(String.format(Locale.ROOT, "avatar-%02d.jpg", genderIndex));

            if (!ImageIO.write(toJpgCompatibleImage(cropped), "jpg", outputFile.toFile())) {
                throw new IOException("No ImageIO writer found for JPG output: " + outputFile);
            }
        }
    }

    private static BufferedImage toJpgCompatibleImage(BufferedImage source) {
        BufferedImage jpgImage = new BufferedImage(
                source.getWidth(),
                source.getHeight(),
                BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = jpgImage.createGraphics();
        try {
            graphics.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR);
            graphics.drawImage(source, 0, 0, null);
        } finally {
            graphics.dispose();
        }
        return jpgImage;
    }
}
