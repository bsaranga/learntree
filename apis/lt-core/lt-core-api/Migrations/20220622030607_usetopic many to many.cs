using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace lt_core_api.Migrations
{
    public partial class usetopicmanytomany : Migration
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
                    FkUserId = table.Column<string>(type: "text", nullable: true),
                    FkTopicId = table.Column<int>(type: "integer", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTopic", x => x.UserTopicId);
                    table.ForeignKey(
                        name: "FK_UserTopic_Topic_FkTopicId",
                        column: x => x.FkTopicId,
                        principalTable: "Topic",
                        principalColumn: "TopicId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTopic_UserActivity_FkUserId",
                        column: x => x.FkUserId,
                        principalTable: "UserActivity",
                        principalColumn: "KcUserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserTopic_FkTopicId",
                table: "UserTopic",
                column: "FkTopicId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTopic_FkUserId",
                table: "UserTopic",
                column: "FkUserId");
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
