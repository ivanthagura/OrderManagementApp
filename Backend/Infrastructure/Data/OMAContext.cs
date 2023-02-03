using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Core.Enums;

namespace Infrastructure.Data
{
    public class OMAContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Address> Addresses { get; set; }

        public OMAContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().HasData(
                new Customer
                {
                    Id = 1, 
                    FirstName = "James",
                    LastName = "Bond",
                    ContactNumber = "041235456",
                    IsDeleted = false,
                    Email = "jamebond@hermajesty.com"
                },
                new Customer
                {
                    Id = 2, 
                    FirstName = "Monty",
                    LastName = "Python",
                    ContactNumber = "123456789",
                    IsDeleted = false,
                    Email = "monty@hermajesty.com"
                }
            );

            modelBuilder.Entity<Address>().HasData(
                new Address
                {
                    Id = 1,
                    CustomerId = 1,
                    AddressLine1 = "SomePlace",
                    AddressLine2 = "There",
                    City = "Melbourne",
                    State = "Victoria",
                    Country = "AU"
                },
                new Address
                {
                    Id = 2,
                    CustomerId = 2,
                    AddressLine1 = "Another Place",
                    AddressLine2 = "Here",
                    City = "Melbourne",
                    State = "Victoria",
                    Country = "AU"
                }
            );

            modelBuilder.Entity<Order>().HasData(
                new Order
                {
                    Id = 1,
                    CustomerId = 1,
                    OrderDate = new DateTime(2022, 10, 20),
                    Description = "New Item",
                    TotalAmount = 500,
                    DepositAmount = 10,
                    IsDelivery = true,
                    Status = Status.PENDING,
                    OtherNotes = "Something new",
                    IsDeleted = false
                },
                new Order
                {
                    Id = 2,
                    CustomerId = 2,
                    OrderDate = new DateTime(2022, 11, 10),
                    Description = "Another New Item",
                    TotalAmount = 5000,
                    DepositAmount = 250,
                    IsDelivery = false,
                    Status = Status.DRAFT,
                    OtherNotes = "Something new again",
                    IsDeleted = false
                }
            );
        }
    }
}