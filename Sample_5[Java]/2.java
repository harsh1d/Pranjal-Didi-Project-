import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

public class PomegranateDiseaseDetection extends JFrame {
    private JLabel imageLabel;
    private JLabel resultLabel;
    private JProgressBar progressBar;

    public PomegranateDiseaseDetection() {
        setTitle("Pomegranate Disease Detection");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        JPanel headerPanel = new JPanel();
        headerPanel.setLayout(new BoxLayout(headerPanel, BoxLayout.Y_AXIS));
        headerPanel.setBackground(new Color(255, 126, 95));

        JLabel titleLabel = new JLabel("Pomegranate Disease Detection");
        titleLabel.setFont(new Font("Montserrat", Font.BOLD, 28));
        titleLabel.setForeground(Color.WHITE);
        titleLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        JLabel instructionLabel = new JLabel("Upload a photo of a pomegranate to check if it contains any disease.");
        instructionLabel.setFont(new Font("Roboto", Font.PLAIN, 18));
        instructionLabel.setForeground(Color.WHITE);
        instructionLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        headerPanel.add(titleLabel);
        headerPanel.add(Box.createRigidArea(new Dimension(0, 10)));
        headerPanel.add(instructionLabel);
        headerPanel.add(Box.createRigidArea(new Dimension(0, 20)));

        JButton uploadButton = new JButton("Select Image");
        uploadButton.setFont(new Font("Roboto", Font.PLAIN, 16));
        uploadButton.setBackground(Color.WHITE);
        uploadButton.setForeground(Color.BLACK);
        uploadButton.setAlignmentX(Component.CENTER_ALIGNMENT);

        headerPanel.add(uploadButton);

        add(headerPanel, BorderLayout.NORTH);

        imageLabel = new JLabel();
        imageLabel.setHorizontalAlignment(JLabel.CENTER);
        imageLabel.setVerticalAlignment(JLabel.CENTER);
        imageLabel.setVisible(false);

        JScrollPane imageScrollPane = new JScrollPane(imageLabel);
        add(imageScrollPane, BorderLayout.CENTER);

        JPanel resultPanel = new JPanel();
        resultPanel.setLayout(new BoxLayout(resultPanel, BoxLayout.Y_AXIS));
        resultPanel.setBackground(new Color(255, 126, 95));

        progressBar = new JProgressBar();
        progressBar.setIndeterminate(true);
        progressBar.setVisible(false);

        resultLabel = new JLabel();
        resultLabel.setFont(new Font("Roboto", Font.BOLD, 18));
        resultLabel.setForeground(Color.WHITE);
        resultLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        resultPanel.add(progressBar);
        resultPanel.add(Box.createRigidArea(new Dimension(0, 10)));
        resultPanel.add(resultLabel);

        add(resultPanel, BorderLayout.SOUTH);

        uploadButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JFileChooser fileChooser = new JFileChooser();
                fileChooser.setAcceptAllFileFilterUsed(false);
                fileChooser.addChoosableFileFilter(new javax.swing.filechooser.FileNameExtensionFilter("Image files", ImageIO.getReaderFileSuffixes()));
                int returnValue = fileChooser.showOpenDialog(null);
                if (returnValue == JFileChooser.APPROVE_OPTION) {
                    File selectedFile = fileChooser.getSelectedFile();
                    try {
                        BufferedImage img = ImageIO.read(selectedFile);
                        if (img != null) {
                            imageLabel.setIcon(new ImageIcon(img.getScaledInstance(imageLabel.getWidth(), -1, Image.SCALE_SMOOTH)));
                            imageLabel.setVisible(true);
                            resultLabel.setText("");
                            progressBar.setVisible(true);

                            // Simulate disease detection
                            new Timer(2000, new ActionListener() {
                                @Override
                                public void actionPerformed(ActionEvent e) {
                                    progressBar.setVisible(false);
                                    boolean hasDisease = new Random().nextBoolean();
                                    if (hasDisease) {
                                        resultLabel.setText("The pomegranate contains a disease.");
                                        resultLabel.setForeground(Color.RED);
                                    } else {
                                        resultLabel.setText("The pomegranate is healthy.");
                                        resultLabel.setForeground(Color.GREEN);
                                    }
                                }
                            }).start();
                        } else {
                            JOptionPane.showMessageDialog(null, "The selected file is not a valid image.", "Error", JOptionPane.ERROR_MESSAGE);
                        }
                    } catch (IOException ex) {
                        JOptionPane.showMessageDialog(null, "Error loading image: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
                    }
                }
            }
        });
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new PomegranateDiseaseDetection().setVisible(true);
            }
        });
    }
}
