/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.uno;

import java.util.ArrayList;
import java.util.Random;
import javax.swing.ImageIcon;

public class UnoDeck 
{
    private UnoCard[] Cards;
    private int CardsInDeck;

    public UnoDeck()
    {
        Cards = new UnoCard[108];
    }

    public void reset()
    {
        UnoCard.Color[] Colors = UnoCard.Color.values();
        CardsInDeck = 0;

        for(int i = 0; i < Colors.length - 1; i++)
        {
            UnoCard.Color Color = Colors[i];
            Cards[CardsInDeck++] = new UnoCard(Color, UnoCard.Value.GetValue(0));

            for(int j = 1; j < 10; j++)
            {
                Cards[CardsInDeck++] = new UnoCard(Color, UnoCard.Value.GetValue(j));
                Cards[CardsInDeck++] = new UnoCard(Color, UnoCard.Value.GetValue(j));
            }

            UnoCard.Value[] Values = new UnoCard.Value[]{UnoCard.Value.DrawTwo,UnoCard.Value.Reverse,UnoCard.Value.Skip};
            for(UnoCard.Value value : Values)
            {
                Cards[CardsInDeck++] = new UnoCard(Color, value);
                Cards[CardsInDeck++] = new UnoCard(Color, value);
            }
        }

        UnoCard.Value[] Values = new UnoCard.Value[]{UnoCard.Value.Wild,UnoCard.Value.WildFour};
        for(UnoCard.Value value : Values)
        {
            for(int i = 0; i<4;i++)
            {
                Cards[CardsInDeck++] = new UnoCard(UnoCard.Color.Wild, value);
            }
        }
    }

    public void ReplaceDeckWith(ArrayList<UnoCard> cards)
    {
        this.Cards = cards.toArray(new UnoCard[cards.size()]);
        CardsInDeck = this.Cards.length;
    }

    public boolean isEmpty()
    {
        return this.CardsInDeck == 0;
    }

    public void shuffle()
    {
        int n = Cards.length;
        Random random = new Random();
        for(int i = 0; i < n; i++)
        {
            int randomIndex = random.nextInt(n-i)+i;
            UnoCard randomCard = Cards[randomIndex];
            Cards[randomIndex] = Cards[i];
            Cards[i] = randomCard;
        }
    }

    public UnoCard DrawCard() throws IllegalArgumentException
    {
        if(isEmpty())
        {
           throw new IllegalArgumentException("No cards in deck");
        }
        return Cards[--CardsInDeck];
    }

    public ImageIcon DrawCardImage() throws IllegalArgumentException
    {
        if(isEmpty())
        {
           throw new IllegalArgumentException("No cards in deck");
        }
        return new ImageIcon(Cards[--CardsInDeck].toString() + ".png");
    }

    public UnoCard[] DrawCard(int n)
    {
        if(n < 0)
        {
            throw new IllegalArgumentException("Must draw positive cards but tried to draw" + n + " cards.");
        }

        if(n > CardsInDeck)
        {
            throw new IllegalArgumentException("Cannot draw " + n + " cards since there are only " + CardsInDeck + " cards.");
        }

        UnoCard[] ret = new UnoCard[n];
        for(int i = 0; i<n;i++)
        {
            ret[i] = Cards[--CardsInDeck];
        }
        return ret;
    }
}
