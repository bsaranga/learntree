using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lt_core_api.Migrations
{
    public partial class addeduniquekey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_UserActivity_KcUserId",
                table: "UserActivity",
                column: "KcUserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserActivity_KcUserId",
                table: "UserActivity");
        }
    }
}
