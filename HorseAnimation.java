import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;

public class HorseAnimation extends JPanel implements ActionListener {
    private static final String BACKGROUND_URL = "https://oss.banana-ai.org/image/2026-05-30/a81ff904-f56e-407e-a7e2-9fb6d83f962c.png";
    private static final String HORSE_URL = "https://media.istockphoto.com/id/1268024572/de/foto/wei%C3%9Fe-einhorn-posiert-mit-clipping-pfad.jpg?s=612x612&w=0&k=20&c=rDXtAmcq0OD6LAhYJoZBvc_WK233IsR1CCHIQgQuocg=";

    private BufferedImage background;
    private BufferedImage horse;
    private float horseX = -200;
    private float horseY = 280;
    private float speed = 2.4f;
    private float phase = 0f;

    public HorseAnimation() {
        setPreferredSize(new Dimension(1200, 720));
        setBackground(Color.BLACK);
        try {
            background = ImageIO.read(new URL(BACKGROUND_URL));
            horse = ImageIO.read(new URL(HORSE_URL));
        } catch (IOException e) {
            System.err.println("Bild konnte nicht geladen werden: " + e.getMessage());
        }
        Timer timer = new Timer(16, this);
        timer.start();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        if (background != null) {
            g2.drawImage(background, 0, 0, getWidth(), getHeight(), null);
        }
        if (horse != null) {
            int horseWidth = getWidth() / 4;
            int horseHeight = horse.getHeight() * horseWidth / horse.getWidth();
            float bob = (float) Math.sin(phase) * 12f;
            int drawX = Math.round(horseX);
            int drawY = Math.round(horseY + bob);
            g2.drawImage(horse, drawX, drawY, horseWidth, horseHeight, null);
            g2.setColor(new Color(255, 255, 255, 80));
            g2.setStroke(new BasicStroke(3f));
            g2.drawOval(drawX + horseWidth / 4, drawY + horseHeight / 2, horseWidth / 5, horseWidth / 10);
        }
        g2.dispose();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        horseX += speed;
        phase += 0.12f;
        if (horseX > getWidth() + 50) {
            horseX = -220;
        }
        repaint();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Galloping Unicorn");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.add(new HorseAnimation());
            frame.pack();
            frame.setLocationRelativeTo(null);
            frame.setVisible(true);
        });
    }
}
