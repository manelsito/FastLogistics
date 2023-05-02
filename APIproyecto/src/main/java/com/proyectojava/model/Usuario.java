/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyectojava.model;

public class Usuario {
	private int idUser;
	private String user;
	private String password;
	private int type;
	private String userName;

	// GETTERS & SETTERS

	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	// CONSTRUCTORS
	public Usuario() {

	}

	public Usuario(int idUser, String user, String password, int type, String userName) {
		this.idUser = idUser;
		this.user = user;
		this.password = password;
		this.type = type;
		this.userName = userName;
	}

	public Usuario(String user, String password) {
		this.user = user;
		this.password = password;
	}

	public Usuario(int idUser) {
		this.idUser = idUser;
	}

}
