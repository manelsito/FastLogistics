package com.proyectojava.model;

import java.util.List;

public class ProductosTarea {
	private int userId;
	private Tarea tarea;
	private List<Producto> productos;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Tarea getTarea() {
		return tarea;
	}

	public void setIdTarea(Tarea tarea) {
		this.tarea = tarea;
	}

	public List<Producto> getProductos() {
		return productos;
	}

	public void setProductos(List<Producto> productos) {
		this.productos = productos;
	}

	public ProductosTarea(Tarea tarea, List<Producto> productos) {
		this.tarea = tarea;
		this.productos = productos;
	}

	public ProductosTarea(int userId, Tarea tarea, List<Producto> productos) {
		this.userId = userId;
		this.tarea = tarea;
		this.productos = productos;
	}

	public ProductosTarea() {

	}

	@Override
	public String toString() {
		return "ProductosTarea [tarea=" + tarea + ", productos=" + productos + "]";
	}

}
