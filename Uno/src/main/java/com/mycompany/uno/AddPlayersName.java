/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JFrame.java to edit this template
 */
package com.mycompany.uno;

import java.awt.Font;
import java.util.ArrayList;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

/**
 *
 * @author Tinca
 */
public class AddPlayersName extends javax.swing.JFrame {

    /**
     * Creates new form AddPlayersName
     */
    public ArrayList<String> playerIds;
    
    public AddPlayersName() {
        initComponents();
        playerIds = new ArrayList<>();
    }
    
    public String[] getPids()
    {
        String[] Pids = playerIds.toArray(new String[playerIds.size()]);
        return Pids;
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        SaveB = new javax.swing.JButton();
        DoneB = new javax.swing.JButton();
        pidTextBox = new javax.swing.JTextField();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        PlayerID1 = new javax.swing.JLabel();
        PlayerID2 = new javax.swing.JLabel();
        PlayerID3 = new javax.swing.JLabel();
        PlayerID4 = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        SaveB.setFont(new java.awt.Font("Arial Black", 0, 14)); // NOI18N
        SaveB.setText("SAVE");
        SaveB.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                SaveBActionPerformed(evt);
            }
        });

        DoneB.setFont(new java.awt.Font("Arial Black", 0, 14)); // NOI18N
        DoneB.setText("DONE");
        DoneB.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                DoneBActionPerformed(evt);
            }
        });

        pidTextBox.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                pidTextBoxActionPerformed(evt);
            }
        });

        jLabel1.setFont(new java.awt.Font("Arial Black", 0, 18)); // NOI18N
        jLabel1.setText("Add the names of the players");

        jLabel2.setFont(new java.awt.Font("Arial Black", 0, 14)); // NOI18N
        jLabel2.setText("Name of the player :");

        PlayerID1.setFont(new java.awt.Font("Arial Black", 0, 12)); // NOI18N

        PlayerID2.setFont(new java.awt.Font("Arial Black", 0, 12)); // NOI18N

        PlayerID3.setFont(new java.awt.Font("Arial Black", 0, 12)); // NOI18N

        PlayerID4.setFont(new java.awt.Font("Arial Black", 0, 12)); // NOI18N

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(108, 108, 108)
                .addComponent(SaveB)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(DoneB)
                .addGap(102, 102, 102))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(134, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                            .addComponent(jLabel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(pidTextBox))
                        .addGap(198, 198, 198))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(PlayerID2)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(PlayerID4))
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(PlayerID1)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(PlayerID3))
                            .addComponent(jLabel1))
                        .addGap(129, 129, 129))))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(75, 75, 75)
                .addComponent(jLabel1)
                .addGap(39, 39, 39)
                .addComponent(jLabel2)
                .addGap(18, 18, 18)
                .addComponent(pidTextBox, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 51, Short.MAX_VALUE)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(PlayerID1)
                            .addComponent(PlayerID3))
                        .addGap(31, 31, 31)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(PlayerID2)
                            .addComponent(PlayerID4))
                        .addGap(117, 117, 117))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(DoneB, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(SaveB, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(48, 48, 48))))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void pidTextBoxActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_pidTextBoxActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_pidTextBoxActionPerformed

    private void SaveBActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_SaveBActionPerformed
        if(pidTextBox.getText().isEmpty())
        {
            JLabel message = new JLabel("Please enter in a name !");
            message.setFont(new Font("Arial",Font.BOLD,48));
            JOptionPane.showMessageDialog(null, message);
        }
        else 
        {
            String name = pidTextBox.getText().trim();
            playerIds.add(name);
            
            if(playerIds.size() == 1)
            {
                PlayerID1.setText(playerIds.get(0));
            }
            else  if(playerIds.size() == 2)
            {
                PlayerID1.setText(playerIds.get(0));
                PlayerID2.setText(playerIds.get(1));
            }
            else  if(playerIds.size() == 3)
            {
                PlayerID1.setText(playerIds.get(0));
                PlayerID2.setText(playerIds.get(1));
                PlayerID3.setText(playerIds.get(2));
            }
            else  if(playerIds.size() == 4)
            {
                PlayerID1.setText(playerIds.get(0));
                PlayerID2.setText(playerIds.get(1));
                PlayerID3.setText(playerIds.get(2));
                PlayerID4.setText(playerIds.get(3));
            }
            if(playerIds.size() > 0 && playerIds.size() < 5)
            {
                JLabel message = new JLabel("Succesful save !");
                message.setFont(new Font("Arial",Font.BOLD,48));
                JOptionPane.showMessageDialog(null, message);
                pidTextBox.setText("");
            }
            
            if(playerIds.size() == 5)
            {
                playerIds.remove(name);
                JLabel message = new JLabel("There can only be 2-4 players !");
                message.setFont(new Font("Arial",Font.BOLD,48));
                JOptionPane.showMessageDialog(null, message);
            }
        }
    }//GEN-LAST:event_SaveBActionPerformed

    private void DoneBActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_DoneBActionPerformed
        if(playerIds.size() == 1 || playerIds.size() == 0)
        {
            JLabel message = new JLabel("There must be at least 2 players !");
            message.setFont(new Font("Arial",Font.BOLD,48));
            JOptionPane.showMessageDialog(null, message);
        }
        else
        {
            this.dispose();
            new GameStage(playerIds).setVisible(true);
        }
        
    }//GEN-LAST:event_DoneBActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(AddPlayersName.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(AddPlayersName.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(AddPlayersName.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(AddPlayersName.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new AddPlayersName().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton DoneB;
    private javax.swing.JLabel PlayerID1;
    private javax.swing.JLabel PlayerID2;
    private javax.swing.JLabel PlayerID3;
    private javax.swing.JLabel PlayerID4;
    private javax.swing.JButton SaveB;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JTextField pidTextBox;
    // End of variables declaration//GEN-END:variables
}