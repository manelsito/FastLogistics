package com.proyectojava.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyectojava.model.Usuario;
import com.proyectojava.services.LoginService;


@CrossOrigin(maxAge = 3600, origins = "*")
@RestController
public class LoginController {

	@Autowired
	LoginService loginService;

	@ResponseBody
	@PostMapping("/login")
	public int login(@RequestBody Usuario user) {
		return loginService.login(user.getUser(), user.getPassword());
	}

	@GetMapping("/getUserType/{userID}")
	public int getUserType(@PathVariable int userID) {
		return loginService.getUserType(userID);
	}

}
