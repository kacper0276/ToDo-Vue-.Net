using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class addToDoGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "ToDoGroupId",
                table: "ToDoItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ToDoGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoGroups", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDoItems_ToDoGroupId",
                table: "ToDoItems",
                column: "ToDoGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_ToDoGroups_ToDoGroupId",
                table: "ToDoItems",
                column: "ToDoGroupId",
                principalTable: "ToDoGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_ToDoGroups_ToDoGroupId",
                table: "ToDoItems");

            migrationBuilder.DropTable(
                name: "ToDoGroups");

            migrationBuilder.DropIndex(
                name: "IX_ToDoItems_ToDoGroupId",
                table: "ToDoItems");

            migrationBuilder.DropColumn(
                name: "ToDoGroupId",
                table: "ToDoItems");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
