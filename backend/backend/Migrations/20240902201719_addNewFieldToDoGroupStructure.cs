using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class addNewFieldToDoGroupStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ToDoGroups",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ToDoGroups_UserId",
                table: "ToDoGroups",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoGroups_Users_UserId",
                table: "ToDoGroups",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoGroups_Users_UserId",
                table: "ToDoGroups");

            migrationBuilder.DropIndex(
                name: "IX_ToDoGroups_UserId",
                table: "ToDoGroups");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ToDoGroups");
        }
    }
}
