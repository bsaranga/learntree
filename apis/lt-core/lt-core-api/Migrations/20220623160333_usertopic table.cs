using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace lt_core_api.Migrations
{
    public partial class usertopictable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "KcUserId",
                table: "UserActivity",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_UserActivity_KcUserId",
                table: "UserActivity",
                column: "KcUserId");

            migrationBuilder.CreateTable(
                name: "UserTopic",
                columns: table => new
                {
                    UserTopicId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: true),
                    TopicId = table.Column<int>(type: "integer", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTopic", x => x.UserTopicId);
                    table.ForeignKey(
                        name: "FK_UserTopic_Topic_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topic",
                        principalColumn: "TopicId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTopic_UserActivity_UserId",
                        column: x => x.UserId,
                        principalTable: "UserActivity",
                        principalColumn: "KcUserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserTopic_TopicId_UserId",
                table: "UserTopic",
                columns: new[] { "TopicId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTopic_UserId",
                table: "UserTopic",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserTopic");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_UserActivity_KcUserId",
                table: "UserActivity");

            migrationBuilder.AlterColumn<string>(
                name: "KcUserId",
                table: "UserActivity",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
