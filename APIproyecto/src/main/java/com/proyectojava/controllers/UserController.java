/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.proyectojava.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectojava.model.Producto;
import com.proyectojava.model.Tarea;
import com.proyectojava.services.UserService;


@RestController
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping("/getUsername/{userID}")
	public String getUsername(@PathVariable int userID) {
		return userService.getUsername(userID);
	}


	@GetMapping("/getWorksByUser/{idUser}")
    public List<Tarea> getWorks(@PathVariable int idUser){
		return userService.findWorksForUser(idUser);
    }


	@GetMapping("/getProductsByTask/{idTask}")
    public List<Producto> getProducts(@PathVariable int idTask){
		return userService.findProductsByTask(idTask);
    }

	@PostMapping("/changeTaskState/{taskId}")
	public boolean changeTaskState(@PathVariable int taskId) {
		return userService.changeTaskState(taskId);
	}


}
