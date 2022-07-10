using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lt_core_api.Migrations
{
    public partial class changedtheuniqueconstraintforlpathmetadata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_LearningPathMetaData_LPId_UserId",
                table: "LearningPathMetaData");

            migrationBuilder.CreateIndex(
                name: "IX_LearningPathMetaData_Title_UserId",
                table: "LearningPathMetaData",
                columns: new[] { "Title", "UserId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_LearningPathMetaData_Title_UserId",
                table: "LearningPathMetaData");

            migrationBuilder.CreateIndex(
                name: "IX_LearningPathMetaData_LPId_UserId",
                table: "LearningPathMetaData",
                columns: new[] { "LPId", "UserId" },
                unique: true);
        }
    }
}
