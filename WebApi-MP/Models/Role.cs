﻿using System;
using System.Collections.Generic;

namespace WebApi_MP.Models;

public partial class Role
{
    public int Id { get; set; }

    public string NombreRol { get; set; } = null!;

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
