// Allow only admins
export const adminOnly = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Generic role-based permission
export const permitRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: `Access denied. Allowed roles: ${allowedRoles.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
};
