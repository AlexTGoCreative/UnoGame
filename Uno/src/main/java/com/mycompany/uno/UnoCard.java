/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.uno;

public class UnoCard {

    enum Color
    {
        Red, Blue, Green, Yellow, Wild;
        private static final Color[] Colors = Color.values();
        public static Color GetColor(int i)
        {
            return Color.Colors[i];
        } 
    }

    enum Value
    {
        Zero, One, Two, Three, Four, Five, Six, Seven, Eight, Nine, DrawTwo, Reverse, Skip, Wild, WildFour;
        private static final Value[] Values = Value.values();
        public static Value GetValue(int i)
        {
            return Value.Values[i];
        } 
    }

    private final Color color;
    private final Value value;

    public UnoCard(final Color color, final Value value)
    {
        this.color = color;
        this.value = value;
    }

    public Color GetColor()
    {
        return this.color;
    }

    public Value GetValue()
    {
        return this.value;
    }

    public String toString()
    {
        return color + " " + value;
    }


}
