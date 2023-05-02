package com.proyectojava.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyectojava.model.Producto;
import com.proyectojava.model.ProductosTarea;
import com.proyectojava.model.Tarea;
import com.proyectojava.model.Usuario;
import com.proyectojava.services.AdminService;

@CrossOrigin(maxAge = 3600, origins = "*")
@RestController
public class AdminController {

	@Autowired
	AdminService adminService;

	@ResponseBody
	@PostMapping("/insertTask")
	public boolean insertTask(@RequestBody ProductosTarea productosTarea) {
		return adminService.insertTask(productosTarea);
	}
	
	@ResponseBody
	@PostMapping("/updateProducts")
	public boolean insertProducts(@RequestBody ProductosTarea productosTarea) {
		return adminService.insertProducts(productosTarea);
	}
	
	@PostMapping("/deleteTask/{taskId}")
	public boolean deleteTask(@PathVariable int taskId) {
		return adminService.deleteTask(taskId);
	}
	
	@GetMapping("/getAllUsers")
	public List<Usuario> getAllUsers() {
		return adminService.getAllUsers();
	}
	
	@GetMapping("/getAllProducts")
	public List<Producto> getAllProducts() {
		return adminService.getAllProducts();
	}
	
	@GetMapping("/getAllTasks")
	public List<Tarea> getAllTasks() {
		return adminService.getAllTasks();
	}
	
	

}
