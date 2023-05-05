package com.proyectojava.model;

import java.util.List;

public class UsuarioTareas {
	private Usuario user;
	private List<Tarea> tareas;
	public Usuario getUser() {
		return user;
	}
	public void setUser(Usuario user) {
		this.user = user;
	}
	public List<Tarea> getTareas() {
		return tareas;
	}
	public void setTareas(List<Tarea> tareas) {
		this.tareas = tareas;
	}
	public UsuarioTareas(Usuario user, List<Tarea> tareas) {
		this.user = user;
		this.tareas = tareas;
	}

}
