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
import com.proyectojava.model.UsuarioTareas;
import com.proyectojava.services.AdminService;

@CrossOrigin(maxAge = 3600, origins = "*")
@RestController
public class AdminController {

	@Autowired
	AdminService adminService;

	@ResponseBody
	@PostMapping("/createUser")
	public boolean createUser(@RequestBody Usuario usuario) {
		return adminService.createUser(usuario);
	}

	@ResponseBody
	@PostMapping("/insertTask")
	public boolean insertTask(@RequestBody ProductosTarea productosTarea) {
		return adminService.insertTask(productosTarea);
	}

	@ResponseBody
	@PostMapping("/insertTaskInUser")
	public boolean insertTaskInUser(@RequestBody ProductosTarea productosTarea) {
		return adminService.insertTask(productosTarea);
	}

	@ResponseBody
	@PostMapping("/addProducts")
	public boolean insertProducts(@RequestBody ProductosTarea productosTarea) {
		return adminService.addProducts(productosTarea);
	}

	@ResponseBody
	@PostMapping("/updateProducts")
	public boolean updateProducts(@RequestBody ProductosTarea productosTarea) {
		return adminService.updateProducts(productosTarea);
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

	@GetMapping("/getAllUserTasks")
	public List<UsuarioTareas> getAllUserTasks() {
		return adminService.getAllUserTasks();
	}

}
