from django.db import models

class Employee(models.Model):
    employee_id = models.CharField(max_length=10, unique=True, default='E12345')
    name = models.CharField(max_length=100, default='John Doe')
    email = models.EmailField(unique=True, default='example@example.com')
    department = models.CharField(max_length=100, default='Human Resources')
    date_of_birth = models.DateField(null=True, blank=True)  # Assuming no default for date fields
    address = models.TextField(default='1234 Main St, Anytown')
    employment_status = models.CharField(max_length=50, default='Full-Time')
    salary = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    salary_due_date = models.DateField(null=True, blank=True)  # Assuming no default for date fields
    image = models.ImageField(upload_to='employee_images/', null=True, blank=True)  # Assuming no default for images

    def __str__(self):
        return self.name
