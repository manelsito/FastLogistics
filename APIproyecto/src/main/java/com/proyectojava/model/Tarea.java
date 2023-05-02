package com.proyectojava.model;

public class Tarea {
	private int idTarea;
	private String direccion;
	private int idUsuario;
	private boolean finalizada;

	public int getIdTarea() {
		return idTarea;
	}

	public void setIdTarea(int idTarea) {
		this.idTarea = idTarea;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public int getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}

	public boolean isFinalizada() {
		return finalizada;
	}

	public void setFinalizada(boolean finalizada) {
		this.finalizada = finalizada;
	}

	public Tarea(int idTarea, String direccion, int idUsuario, boolean finalizada) {
		this.idTarea = idTarea;
		this.direccion = direccion;
		this.idUsuario = idUsuario;
		this.finalizada = finalizada;
	}

	public Tarea(int idTarea, String direccion, int idUsuario) {
		this.idTarea = idTarea;
		this.direccion = direccion;
		this.idUsuario = idUsuario;
	}

	public Tarea(String direccion, int idUsuario) {
		this.direccion = direccion;
		this.idUsuario = idUsuario;
	}

	public Tarea() {

	}

}
