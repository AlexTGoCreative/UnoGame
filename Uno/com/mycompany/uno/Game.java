/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.uno;

import java.util.ArrayList;
import java.util.Arrays;

import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.text.PlainDocument;

import java.awt.Font;
import javax.swing.ImageIcon;

import Uno.UnoCard;
import Uno.UnoDeck;

public class Game{

    private int CurrentPlayer;
    private String[] PlayerIds;

    private UnoDeck deck;
    private ArrayList<ArrayList<UnoCard>> playerHand;
    private ArrayList<UnoCard> stockpile;

    private UnoCard.Color validColor;
    private UnoCard.Value validValue;

    boolean gameDirection;

    public Game(String[] pids)
    {
        deck = new UnoDeck();
        deck.shuffle();
        stockpile = new ArrayList<UnoCard>();

        PlayerIds = pids;
        CurrentPlayer = 0;
        gameDirection = false;

        playerHand = new ArrayList<ArrayList<UnoCard>>();

        for(int i = 0; i<pids.length;i++)
        {
            ArrayList<UnoCard> hand = new ArrayList<UnoCard>(Arrays.asList(deck.DrawCard(7)));
            playerHand.add(hand);
        }
    }

    public void start(Game game)
    {
        UnoCard card = deck.DrawCard();
        validColor = card.GetColor();
        validValue = card.GetValue();

        if(card.GetValue() == UnoCard.Value.Wild)
        {
            start(game);
        }

        if(card.GetValue() == UnoCard.Value.DrawTwo || card.GetValue() == UnoCard.Value.WildFour)
        {
            start(game);
        }

        if(card.GetValue() == UnoCard.Value.Skip)
        {
            JLabel message = new JLabel(PlayerIds[CurrentPlayer] + " was skipped !");
            message.setFont(new Font("Arial", Font.BOLD, 48));
            JOptionPane.showMessageDialog(null, message);

            if(gameDirection)
            {
                CurrentPlayer = (CurrentPlayer - 1) % PlayerIds.length;
            }
            else
            {
                CurrentPlayer = (CurrentPlayer + 1) % PlayerIds.length;
                if(CurrentPlayer == -1)
                {
                    CurrentPlayer = PlayerIds.length - 1;
                }
            }
        }

        if(card.GetValue() == UnoCard.Value.Reverse)
        {
            JLabel message = new JLabel(PlayerIds[CurrentPlayer] + " The game direction changed!");
            message.setFont(new Font("Arial", Font.BOLD, 48));
            JOptionPane.showMessageDialog(null, message);

            gameDirection ^= true;
            CurrentPlayer = PlayerIds.length - 1;
        }

        stockpile.add(card);
    }

    public UnoCard getTopCard(){
        return new UnoCard(validColor, validValue);
    }

    public ImageIcon getTopCardImage(){
        return new ImageIcon(validColor + "-" + validValue + ".png");
    }

    public boolean isGameOver()
    {
        for(String player : this.PlayerIds)
        {
            if(hasEmptyHand(player)){
                return true;
            }
        }
        return false;
    }

    public String getCurrentPlayer()
    {
        return this.PlayerIds[this.CurrentPlayer];
    }

    public String getPreviousPlayer()
    {
        int index = CurrentPlayer-1;
        if(index == -1)
           index = PlayerIds.length-1;
        return this.PlayerIds[index];
    }

    public String[] getPlayers(){
        return PlayerIds;
    }

    public ArrayList<UnoCard> getPlayerHand(String pid)
    {
        int index = Arrays.asList(PlayerIds).indexOf(pid);
        return playerHand.get(index);
    }

    public int getPlayerHandSize(String pid)
    {
        return getPlayerHand(pid).size();
    }

    public UnoCard getPlayerCard(String pid, int choice)
    {
        ArrayList<UnoCard> hand = getPlayerHand(pid);
        return hand.get(choice);
    }

    public boolean hasEmptyHand(String pid)
    {
        return getPlayerHand(pid).isEmpty();
    }

    public boolean validCardPlay(UnoCard card)
    {
        return card.GetColor() == validColor || card.GetValue() == validValue;
    }

    public void checkPlayerTurn(String pid) throws InvalidPlayerTurnException
    {
        if(this.PlayerIds[this.CurrentPlayer] != pid)
           throw new InvalidPlayerTurnException("it is not " + pid + " 's turn",pid);
    }

    public void submitDraw(String pid) throws InvalidPlayerTurnException{

        checkPlayerTurn(pid);

        if(deck.isEmpty())
        {
            deck.ReplaceDeckWith(stockpile);
            deck.shuffle();
        }

        getPlayerHand(pid).add(deck.DrawCard());

        if(gameDirection == false)
        {
            CurrentPlayer = (CurrentPlayer + 1) % PlayerIds.length;
        }
        else
        {
            CurrentPlayer = (CurrentPlayer - 1) % PlayerIds.length;
            if(CurrentPlayer == -1)
               CurrentPlayer = PlayerIds.length - 1;
        }
    }

    public void serCardColor(UnoCard.Color color)
    {
        validColor = color;
    }

    public void submitPlayerCard(String pid, UnoCard card, UnoCard.Color declaredColor) throws InvalidColorSubmissionException, InvalidValueSubmissionException, InvalidPlayerTurnException
    {
        checkPlayerTurn(pid);

        ArrayList<UnoCard> playerHand = getPlayerHand(pid);

        if(!validCardPlay(card))
        {
            if(card.GetColor() == UnoCard.Color.Wild){
                validColor = card.GetColor();
                validValue = card.GetValue();
            }

            if(card.GetColor() != validColor)
            {
                JLabel message = new JLabel("Invalid player move, expected color: " + validColor + " but got color: " + card.GetColor());
                message.setFont(new Font("Arial", Font.BOLD, 48));
                JOptionPane.showMessageDialog(null, message);
                throw new InvalidColorSubmissionException("Invalid player move, expected color: " + validColor + " but got color: " + card.GetColor(), card.GetColor(), validColor);
            }
            else if(card.GetValue() != validValue)
            {
                JLabel message1 = new JLabel("Invalid player move, expected value: " + validValue + " but got value: " + card.GetValue());
                message1.setFont(new Font("Arial", Font.BOLD, 48));
                JOptionPane.showMessageDialog(null, message1);
                throw new InvalidValueSubmissionException("Invalid player move, expected value: " + validValue + " but got value: " + card.GetValue(), card.GetValue(), validValue);
            }
        }

        playerHand.remove(card);
        if(hasEmptyHand(this.PlayerIds[CurrentPlayer]))
        {
            JLabel message1 = new JLabel(this.PlayerIds[CurrentPlayer] + " won the game! Thank you for playing !");
            message1.setFont(new Font("Arial", Font.BOLD, 48));
            JOptionPane.showMessageDialog(null, message1);
            System.exit(0);
        }

        validColor = card.GetColor();
        validValue = card.GetValue();
        stockpile.add(card);

        if(gameDirection == false)
        {
            CurrentPlayer = (CurrentPlayer + 1) % PlayerIds.length;
        }
        else
        {
            CurrentPlayer = (CurrentPlayer - 1) % PlayerIds.length;
            if(CurrentPlayer == -1)
               CurrentPlayer = PlayerIds.length - 1;
        }

        if(card.GetColor() == UnoCard.Color.Wild)
        {
            validColor = declaredColor;
        }

        if(card.GetValue() == UnoCard.Value.DrawTwo)
        {
            pid = PlayerIds[CurrentPlayer];
            getPlayerHand(pid).add(deck.DrawCard());
            getPlayerHand(pid).add(deck.DrawCard());
            JLabel message = new JLabel(pid + " drew 2 cards !");
        }

        if(card.GetValue() == UnoCard.Value.WildFour)
        {
            pid = PlayerIds[CurrentPlayer];
            getPlayerHand(pid).add(deck.DrawCard());
            getPlayerHand(pid).add(deck.DrawCard());
            getPlayerHand(pid).add(deck.DrawCard());
            getPlayerHand(pid).add(deck.DrawCard());
            JLabel message = new JLabel(pid + " drew 4 cards !");
        }

        if(card.GetValue() == UnoCard.Value.Skip)
        {
            JLabel message = new JLabel(PlayerIds[CurrentPlayer] + " was skipped !");
            message.setFont(new Font("Arial", Font.BOLD, 48));
            JOptionPane.showMessageDialog(null, message);
            if(gameDirection == false)
            {
                CurrentPlayer = (CurrentPlayer + 1) % PlayerIds.length;
            }
            else
            {
                CurrentPlayer = (CurrentPlayer - 1) % PlayerIds.length;
                if(CurrentPlayer == -1)
                   CurrentPlayer = PlayerIds.length - 1;
            }
        }

        if(card.GetValue() == UnoCard.Value.Reverse)
        {
            JLabel message = new JLabel(PlayerIds[CurrentPlayer] + " changed the game direction");
            message.setFont(new Font("Arial", Font.BOLD, 48));
            JOptionPane.showMessageDialog(null, message);

            gameDirection ^= true;
            if (gameDirection == true) 
            {
                CurrentPlayer = (CurrentPlayer - 2) % PlayerIds.length;

                if(CurrentPlayer == -1)
                   CurrentPlayer = PlayerIds.length - 1;

                if(CurrentPlayer == -2)
                   CurrentPlayer = PlayerIds.length - 2;
            }
            else 
            {
                CurrentPlayer = (CurrentPlayer + 2) % PlayerIds.length;
            }
        }
    }
}

class InvalidPlayerTurnException extends Exception{
    String PlayerId;

    public InvalidPlayerTurnException(String message, String Pid)
    {
        super(message);
        PlayerId = Pid;
    }

    public String getPid()
    {
        return PlayerId;
    }
}

class InvalidColorSubmissionException extends Exception{
    private UnoCard.Color expected;
    private UnoCard.Color actual;

    public InvalidColorSubmissionException(String message, UnoCard.Color actual, UnoCard.Color expected)
    {
        super(message);
        this.actual = actual;
        this.expected = expected;
    }
}

class InvalidValueSubmissionException extends Exception{
    private UnoCard.Value expected;
    private UnoCard.Value actual;

    public InvalidValueSubmissionException(String message, UnoCard.Value actual, UnoCard.Value expected)
    {
        super(message);
        this.actual = actual;
        this.expected = expected;
    }
}


